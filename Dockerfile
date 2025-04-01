FROM node:20-alpine AS build

WORKDIR /app

# 먼저 package.json과 package-lock.json만 복사
COPY package*.json ./

RUN npm install

# 프로젝트 파일 복사
COPY . .

# 빌드 전 디버깅
RUN echo "Node version: $(node -v)" && echo "NPM version: $(npm -v)"

RUN npm run build

FROM nginx:alpine

# 빌드 스테이지에서 빌드 결과물 복사 (Vite: dist 폴더에 빌드)
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
