import { useReducer } from "react";
import { AppContext } from "..";

export const AppContextProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIRST_NAME": {
        return {
          ...state,
          userSignupData: {
            ...state.userSignupData,
            firstName: action.payload,
          },
        };
      }

      case "UPDATE_LAST_NAME": {
        return {
          ...state,
          userSignupData: { ...state.userSignupData, lastName: action.payload },
        };
      }

      case "UPDATE_USERNAME": {
        return {
          ...state,
          userSignupData: { ...state.userSignupData, userName: action.payload },
        };
      }
      case "UPDATE_USER_EMAIL": {
        return {
          ...state,
          userSignupData: {
            ...state.userSignupData,
            userEmail: action.payload,
          },
        };
      }
      case "UPDATE_USER_PASSWORD": {
        return {
          ...state,
          userSignupData: {
            ...state.userSignupData,
            userPassword: action.payload,
          },
        };
      }

      case "UPDATE_USER_CONFIRM_PASSWORD": {
        return {
          ...state,
          userSignupData: {
            ...state.userSignupData,
            userConfirmPassword: action.payload,
          },
        };
      }

      case "UPDATE_SIGNUP_CONDITIONS_CHECK": {
        return {
          ...state,
          userSignupData: {
            ...state.userSignupData,
            isSignupConditionsChecked: action.payload,
          },
        };
      }

      case "UPDATE_USER_SIGNUP_DATA": {
        return { ...state, userSignupData: action.payload };
      }

      case "UPDATE_USER_LOGGEDIN": {
        return { ...state, userLoggedIn: true };
      }

      case "UPDATE_POSTS": {
        return { ...state, userPosts: action.payload };
      }
      case "UPDATE_BOOKMARKS": {
        return { ...state, userBookmarks: action.payload };
      }

      case "SHOW_POST_OPTIONS": {
        return { ...state, showPostOptions: action.payload };
      }

      case "UPDATE_POST_DETAILS_OBJ": {
        return { ...state, userPostDetails: action.payload };
      }

      default:
        return state;
    }
  };

  const initialValue = {
    userSignupData: {
      firstName: "",
      lastName: "",
      userName: "",
      userEmail: "",
      userPassword: "",
      userConfirmPassword: "",
      isSignupConditionsChecked: false,
    },
    userLoggedIn: false,
    userPosts: [],
    userBookmarks: [],
    showPostOptions: false,
    userPostDetails: {
      content: "",
      createdAt: "",
      id: "",
      likes: "",
      updatedAt: "",
      userFullName: "",
      username: "",
      _id: "",
    },
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
