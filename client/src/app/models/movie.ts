export class Movie {
  _id?: string;
  likedBy?: [];
  hatedBy?: [];
  name?: string;
  description?: string;
  createdAt?: string;
  createdBy?: User;
}

export class User {
  _id?: string;
  username?: string;
  email?: string
  createdAt?: string
}
