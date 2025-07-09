interface PostData {
  content: string;
  images: (string | ArrayBuffer | null)[];
  visibility: string;
  userId: string;
}

export type { PostData };
