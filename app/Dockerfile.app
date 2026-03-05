# ===============================
# 1️⃣ Build Stage (Angular build)
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY app/package*.json ./
RUN npm ci

# Copy source
COPY app/ .

# Build Angular in production mode
RUN npm run build -- --configuration production


# ===============================
# 2️⃣ Production Stage (Nginx)
# ===============================
FROM nginx:1.29-alpine

# Install curl for proper HTTP healthcheck
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=builder /app/dist/app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# HEALTHCHECK — checks the HTTP availability of the server
HEALTHCHECK --interval=5s --timeout=3s --retries=10 \
  CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]

