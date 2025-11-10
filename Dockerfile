FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

# Accept build arguments
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_BRAND_NAME
ARG REACT_APP_SUPPORT_EMAIL

# Set environment variables
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_BRAND_NAME=$REACT_APP_BRAND_NAME
ENV REACT_APP_SUPPORT_EMAIL=$REACT_APP_SUPPORT_EMAIL

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]