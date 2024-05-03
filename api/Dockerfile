FROM openjdk:17
EXPOSE 443

WORKDIR /app

COPY target/anonygram.jar .

# wait-for-it from https://github.com/vishnubob/wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# CMD ["./wait-for-it.sh", "ag-mysql:3306", "--", "./wait-for-it.sh", "ag-redis:6379", "--", "java","-jar","/anonygram.jar"]

CMD ["java", "-jar", "anonygram.jar"]