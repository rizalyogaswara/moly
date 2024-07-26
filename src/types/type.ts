export interface ButtonProps {
  width?: string;
  background?: string;
  disabled?: boolean;
  content: string;
}

type AvatarType = {
  blurDataURL: string;
  blurHeight: number;
  blurWidth: number;
  height: number;
  src: string;
  width: number;
};

export interface PlayerData {
  avatar: AvatarType;
  avatarName: string;
  money: number;
  name: string;
  purchaseItem: [];
}

export interface ContentBlockInterface {
  "block-number": number;
  "content-block": number | string;
  "bg-source": string;
  "name-block": string;
}

export interface ModalChooseCharacterProps {
  isOpenModal: boolean;
  modalController: () => void;
  setAvatarForPlayer1: (urlImage: string) => void;
  setAvatarForPlayer2?: (urlImage: string) => void;
  whoChooseAvatar: number;
}

export interface AlertModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  content?: string;
}

export type itemPlayer = {
  nameItem: string;
  imageSrc: string;
};

export interface GameTurnModalProps {
  sessionGame: number;
  player1Name: string;
  player2Name?: string;
  roleResult: number;
  player1Item: itemPlayer[];
  player2Item?: itemPlayer[];
  isMovingPlayer1: boolean;
  isMovingPlayer2?: boolean;
  player1Money: number;
  player2Money?: number;
  roleDone?: (a: number, b: number[]) => void;
}
