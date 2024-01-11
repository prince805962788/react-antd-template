import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertEvent {
  trackId: string;
  type: number;
  plate: string;
}
export interface DirectionState {
  alertEvents?: AlertEvent[];
  data?: { timestamp: number };
  videoData?: string;
}
export interface CameraState {
  left: DirectionState;
  merge: DirectionState;
  right: DirectionState;
}
const initialState: CameraState = {
  left: { videoData: '', data: { timestamp: 0 }, alertEvents: [] },
  merge: { videoData: '', data: { timestamp: 0 }, alertEvents: [] },
  right: { videoData: '', data: { timestamp: 0 }, alertEvents: [] },
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    // 不要直接修改state，修改会无效，需要取它的key依次赋值
    setCameraState: (state, action: PayloadAction<Partial<CameraState>>) => {
      const { left, merge, right } = action.payload;
      state.left = { ...state.left, ...left };
      state.merge = { ...state.merge, ...merge };
      state.right = { ...state.right, ...right };
    },
  },
});

export const { setCameraState } = cameraSlice.actions;
export default cameraSlice.reducer;
