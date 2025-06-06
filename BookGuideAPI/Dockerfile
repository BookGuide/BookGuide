FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Core/BookGuideAPI.Application Core/BookGuideAPI.Application
COPY Core/BookGuideAPI.Domain Core/BookGuideAPI.Domain
COPY Infrastructure/BookGuideAPI.Infrastructure Infrastructure/BookGuideAPI.Infrastructure
COPY Infrastructure/BookGuideAPI.Persistence Infrastructure/BookGuideAPI.Persistence
COPY Presentation/BookGuideAPI.API Presentation/BookGuideAPI.API
COPY BookGuideAPI.sln .

RUN dotnet restore Presentation/BookGuideAPI.API/BookGuideAPI.API.csproj
RUN dotnet publish Presentation/BookGuideAPI.API/BookGuideAPI.API.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Eğer gerçekten gerekiyorsa:
COPY Presentation/BookGuideAPI.API/appsettings.json ./appsettings.json

ENTRYPOINT ["dotnet", "BookGuideAPI.API.dll"]
