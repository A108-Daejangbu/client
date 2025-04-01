# 빌드 스테이지
FROM node:16-alpine AS build

WORKDIR /app

# 먼저 package.json과 package-lock.json만 복사 (캐싱 개선)
COPY package*.json ./

# 의존성 설치 
RUN npm install

# 프로젝트 파일 복사
COPY . .

# 빌드 전 로그 확인 (디버깅용)
RUN echo "Node version: $(node -v)" && echo "NPM version: $(npm -v)"

# 빌드 실행 (Vite 프로젝트)
RUN npm run build

# 실행 스테이지
FROM nginx:alpine

# 빌드 스테이지에서 빌드 결과물 복사 (Vite는 dist 폴더에 빌드)
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]