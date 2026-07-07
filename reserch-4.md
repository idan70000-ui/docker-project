2 - DEV) בקובץ הדוקר-פייל פיצלתי את הנתונים שם לשלושה חלקים:
prodacsion,development,deps
בסביבת פיתוח הגדרתי לו nodemod על מנת שיוכל להפעיל מחדש את האפליקצייה בכל פעם שהוא מזהה שינוי.
בנוסף, ב־docker-compose.override.yml הגדרתי את target: development, כך שבזמן יצירת ה־image Docker משתמש בשלב development שב־Dockerfile, שבו מותקנים כלי הפיתוח ומוגדר nodemon.
 לאחר מכן בdocker-compose.override.yml ביצירה של האימג' של האפליקצייה שלנו (app) 
 בתוך תהליך היצירה שלו הגדרתי לו גם volumes:
      - .:/app
      שזה אומר שבתהליך עצמו זה יעשה bind mount.(מנגנון של דוקר שמחבר קובץ או תיקייה שהגדרנו או יצרנו ישירות     לקונטיינר בדוקר בלי לעשות בילד כל פעם מחדש לאימג הקיים.)

services:
  app:
    build:
      target: development
    command: npx nodemon app.js
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      NODE_ENV: development







3 - PROD) בשלב הפרודקשן לא משתמשים בvolumes:
  - .:/app
  ולכן הקונטיינר נוצר מחדש מתוך האימג ולכן התהליך דורש לבצע בילד לאימג מחדש בכל פעם שאנחנו מבצעים עדכון בקוד שלנו וגם הקונטיינר נוצר מחדש ואנחנו למעשה ברגע שאימג שלנו התעדכן גם הקונטיינר עצמו נוצר מחדש ומתעדכן.
  (פירוט של הדברים נמצא בקובץ הdocker-compose ובdockerfile)

services:
  app:
    build:
      context: .
      target: production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    ports:
      - "5000:3000"
    environment:
      NODE_ENV: production
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      mongo:
        condition: service_healthy




  4) development: (docker-compose.override.yml)
  services:
  app:
    build:
      target: development
    command: npx nodemon app.js
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      NODE_ENV: development

        
        
        
        
        prodaction: (docker-compose.yml)
        app:
    build:
      context: .
      target: prodaction
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    ports:
      - "5000:3000"
    volumes:
      - /app/node_modules
    environment:
      NODE_ENV: prodaction
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      mongo:
        condition: service_healthy