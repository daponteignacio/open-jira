# NextJS - OpenJira
Para correr localmente se necesita la base de datos
```
    docker-compose up -d
```

* El -d, significa detached


## Configurar las variables de entorno
Renombrar el archivo __.env.template a .env__
* MongoDB URL Local:
```
    MONGO_URL=mongodb://localhost:27017/entriesdb
```	

## Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas
Llamar a:
```
    http://localhost:3000/api/seed
```
