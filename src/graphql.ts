
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ServiceTypes {
    MagicLink = "MagicLink",
    Credentials = "Credentials",
    Facebook = "Facebook",
    Google = "Google",
    Apple = "Apple",
    JWT = "JWT"
}

export interface LoginParamsInput {
    accessToken?: Nullable<string>;
    accessTokenSecret?: Nullable<string>;
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
}

export interface LoginInput {
    params: LoginParamsInput;
    service: ServiceTypes;
}

export interface MoviePayload {
    title: string;
    image: string;
    publishedYear: number;
    releaseDate?: Nullable<DateTime>;
    genre?: Nullable<string>;
    duration?: Nullable<number>;
    director?: Nullable<string>;
}

export interface CreateMovieInput {
    title: string;
    image: string;
    releaseDate?: Nullable<DateTime>;
    genre?: Nullable<string>;
    duration?: Nullable<number>;
    director?: Nullable<string>;
    publishedYear: number;
}

export interface UpdateMovieInput {
    id: string;
    movie: MoviePayload;
}

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    timezone?: Nullable<string>;
}

export interface UpdateUserInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    timezone?: Nullable<string>;
}

export interface MovieInterface {
    title: string;
    director?: Nullable<string>;
    image: string;
    releaseDate?: Nullable<DateTime>;
    duration?: Nullable<number>;
    genre?: Nullable<string>;
    publishedYear: number;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface IMutation {
    __typename?: 'IMutation';
    loginProvider(loginInput?: Nullable<LoginInput>): Account | Promise<Account>;
    login(email: string): boolean | Promise<boolean>;
    refreshAuthTokens(refreshToken: string): Tokens | Promise<Tokens>;
    logout(): LogoutResult | Promise<LogoutResult>;
    register(email: string, password: string): Account | Promise<Account>;
    createMovie(createMovieInput: CreateMovieInput): Movie | Promise<Movie>;
    updateMovie(updateMovieInput: UpdateMovieInput): Movie | Promise<Movie>;
    removeMovie(id: string): Nullable<Movie> | Promise<Nullable<Movie>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface LogoutResult {
    __typename?: 'LogoutResult';
    success?: Nullable<boolean>;
}

export interface Tokens {
    __typename?: 'Tokens';
    accessToken: string;
    refreshToken: string;
}

export interface Account {
    __typename?: 'Account';
    id: string;
    user?: Nullable<User>;
    tokens?: Nullable<Tokens>;
}

export interface Movie extends MovieInterface {
    __typename?: 'Movie';
    id: string;
    title: string;
    image: string;
    releaseDate?: Nullable<DateTime>;
    genre?: Nullable<string>;
    duration?: Nullable<number>;
    director?: Nullable<string>;
    publishedYear: number;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface IQuery {
    __typename?: 'IQuery';
    movies(): Nullable<Movie>[] | Promise<Nullable<Movie>[]>;
    movie(id: string): Nullable<Movie> | Promise<Nullable<Movie>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    me(): User | Promise<User>;
}

export interface User {
    __typename?: 'User';
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    timezone?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
