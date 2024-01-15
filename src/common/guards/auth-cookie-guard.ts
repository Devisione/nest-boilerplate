import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import type { Request } from "express";
import { AUTH_COOKIE_NAME } from "../constants/auth-names";

@Injectable()
export class AuthCookieGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies as Record<string, string>;
    const token = cookies[AUTH_COOKIE_NAME];

    if (!token) return false;

    // так же можно сделать проверку токена по необходимости

    return true;
  }
}
