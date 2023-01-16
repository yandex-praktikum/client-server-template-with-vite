import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

import {
  getUserData,
  IUserSigninReq,
  IUserSignUpReq,
  requestLogIn,
  requestLogOut,
  requestSignUp,
} from '../../api/auth';
import { getIsShallowEqual } from '../../utils/getIsShallowEqual';
import { setUserInfo } from '../reducers';
import { selectUserInfo } from '../selectors';
import { RootState } from '../store';

export type TAuthAction = ThunkAction<void, RootState, unknown, AnyAction>;

export const getUserInfo = (): TAuthAction => async (dispatch, getState) => {
  const userInfo = selectUserInfo(getState());

  try {
    const { data } = await getUserData();

    if (!getIsShallowEqual(data, userInfo)) {
      dispatch(setUserInfo(data));
    }
  } catch (err) {
    console.error(err);

    if (userInfo) {
      dispatch(setUserInfo(null));
    }
  }
};

export const logIn =
  (data: IUserSigninReq): TAuthAction =>
  async dispatch => {
    try {
      await requestLogIn(data);
    } catch (err) {
      return err;
    } finally {
      dispatch(getUserInfo());
    }
  };

export const logOut = (): TAuthAction => async dispatch => {
  try {
    await requestLogOut();
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(getUserInfo());
  }
};

export const signUp =
  (data: IUserSignUpReq): TAuthAction =>
  async dispatch => {
    try {
      await requestSignUp(data);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(getUserInfo());
    }
  };
