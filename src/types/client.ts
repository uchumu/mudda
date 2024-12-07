export type Browser =
  | "Normal"
  | "InAppKakao"
  | "InAppInstagram"
  | "InAppFacebook"
  | "InAppTicTok"
  | "InAppLine";

export interface Step {
  children: JSX.Element;
  BottomButton: {
    title?: string;
    onClick: () => boolean;
    disabled?: boolean;
  };
  errorMessage: string;
}

export interface Photo {
  file: File;
  url: string;
}
