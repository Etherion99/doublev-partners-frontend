# doublev-partners-frontend

Angular frontend for the technical test of the full-stack developer position at Double V Partners

## Aclaraciones y Comentarios

- El endpoint users de la api de github (https://api.github.com/users/${login}) no retorna el score del usuario con lo cuál no es un método viable de comprobar el score del usuario al cual se le está consultando su perfil, para ello se plantean algunas alternativas.

1. Aprovechar que en el explorador se obtienen los scores y enviarlo como parámetro de la URL para ser recuperado luego por el guard (esta opción no es viable desde el punto de vista de seguridad ya que el usuario puede manipular el score).

2. Aprovechar que en el explorador se obtienen los scores y guardarlo en el localstorage para ser recuperado luego por el guard (a pesar de que el localstorage es un poco más seguro que enviar el parámetro por URL ya que no es visible a simple vista, esta opción no es viable desde el punto de vista de seguridad ya que el usuario puede manipular el score).

3. Recuperar el score del usuario mediante el endpoint de búsqueda (https://api.github.com/search/users?q=${login}) (esta alternativa si es segura ya que el usuario no es capaz de alterar el score tan facilmente al provenir de una fuente externa).

La alternativa elegida para encontrar el score es consultar el endpoint de búsqueda (https://api.github.com/search/users?q=${login}) y filtrar entre los resultados ya que en este si se retorna el score, por ello existe esté código en el guard a pesar de que no se utiliza

```
const login = next.params['login'];

// consultar y verificar el score del usuario según la API de Github
try {
  const usersData: any = await lastValueFrom(this.githubService.searchUsers(login));
  const user = usersData?.items.find((item: any) => login === item.login);

  if (user?.score >= 30.0) {
    return true;
  } else {
    this.router.navigate(['/errors/not-allowed']);
    return false;
  }
} catch (error) {
  console.error(error);
  this.router.navigate(['/errors/not-allowed']);
  return false;
}
```

- Después de consultar la API con los scores de los usuarios se evidenció que por alguna razón todos los scores eran 1 lo cuál hacía imposible que ningún perfil pasara por el guard, por este motivo se asignaron scores aleatorios entre 20 y 50 a todos los usuarios y se modificó el routing para enviar el score como un parametro de la URL (esta práctica es específica de este caso y con motivos de poder probar correctamente la aplicación, en un entorno de producción e suna mala práctica ya que se le da la opción al usuario de fácilmente manipular el score y atravesar el guard, lo ideal es buscar una fuente confiable de datos que proporcione los scores sin influencia del usuario).

- la gráfica de seguidores en los usuarios consultados se encuentra al final de la lista de resultados y es viisble solo luego de realizar la búsqueda.

- para mejorar la UX se optó por eliminar el uso de un botón para accionar la búsqueda y se reemplazó por eventos de teclado que detectan cuando el usuario diligencia el campo de búsqueda.

## Despliegue en Local

1. clonar el repositorio
2. ejecutar `npm i`
3. ejecutar `npm run start`, por defecto el servidor se suvirá en: http://localhost:4200/

## Despliegue a Producción

1. Ejecutar `npm run build`
2. Copiar el contenido de dist/doublev-partners-frontend en el public_html del servidor o la carpeta principal del servidor web según corresponda.

## Demo

https://sebastian-trujillo.me/doublevpartners-frontend

## Tecnologías utilizadas

- Angular (HTML5, CSS3, Typescript)
- primeng/primeflex (Framework CSS seleccionado, es muy similar a Bootstrap pero con una librería más amplia de componentes y fácil manejo de temas. Primeng contiene los componentes y manejo de temas mientras que primeflex tiene las clases precreadas para aplicar estilos al igual que lo hace Bootstrap).
- fontawesome (librería de iconos)
- ngx-charts (librería de gráficos seleccionada)

## Estructura general del proyecto
