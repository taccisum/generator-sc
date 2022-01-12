FROM openjdk:8

WORKDIR /workspace/

ADD ./target/${jar_name}.jar ./app.jar

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
