FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy all files from the context
COPY . .

# Ensure the build script is executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Prepare the final executable
RUN cp target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

EXPOSE 8080
