FROM node:20.15.1-alpine3.20

RUN corepack enable pnpm && \
    corepack use pnpm && \ 
    pnpm config set store-dir "/root/.local/share/pnpm/store"