import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export class AuthHeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.get("authorization")?.replace("Bearer", "").trim();

    if (!token) return false;

    // так же можно сделать проверку токена по необходимости

    return true;
  }
}
