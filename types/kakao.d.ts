export {};
interface KakaoShareLink {
  webUrl?: string;
  mobileWebUrl?: string;
  androidExecParams?: string;
  iosExecParams?: string;
}

interface KakaoShareButton {
  title: string;
  link: KakaoShareLink;
}

interface KakaoShareContent {
  title: string;
  imageUrl: string;
  link: KakaoShareLink;
  description?: string;
  imageWidth?: number;
  imageHeight?: number;
}

interface KakaoSharePayload {
  objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
  content: KakaoShareContent;
  buttons?: KakaoShareButton[];
}

interface KakaoAPI {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (payload: KakaoSharePayload) => void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoAPI;
  }
}
