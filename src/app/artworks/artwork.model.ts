import { User } from "../users/user.model";

export interface Artwork {
  id: string;
  title: string;
  preview: string;
  imagePath: string;
  zipFilePath: string;
  tags: string;
  designer: User[];
}
