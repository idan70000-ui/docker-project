# --- Stage 1: Base Image ---
# משתמשים בגרסת alpine הרזה כבסיס משותף
FROM node:20alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# --- Stage 2: Development (לסביבת פיתוח) ---
FROM base AS development
# מתקין את כל החבילות כולל devDependencies (כלומר nodemon)
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# --- Stage 3: Production (לסביבת ייצור) ---
FROM base AS production
# מתקין חבילות פרודקשן בלבד (מתעלם מ-nodemon)
RUN npm install --only=production
COPY . .
# הרצה נקייה ישירות עם Node
CMD ["npm", "start"]