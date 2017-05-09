import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import { GoogleBooksService } from './services/google-books';
import { BookExistsGuard } from './guards/book-exists';

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  BookExistsGuard,
  GoogleBooksService
];
