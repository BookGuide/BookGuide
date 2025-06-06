# ⬛ Vite tabanlı React uygulaması
FROM node:18-alpine
WORKDIR /app
COPY . .

# Paketleri yükle ve geliştirme sunucusunu başlat
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
