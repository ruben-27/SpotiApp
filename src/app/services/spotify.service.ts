import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // Atributtes
  token: string;
  numeroError: number;


  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {

    this.token = this.obtenerCookie('token');
    this.numeroError = 0;

  }

  /**
   * Forma la cabecera para realizar la petición
   *
   * @return headers:HttpHeaders Cabecera para realizar la petición
   */
  getHeader(): HttpHeaders{

    // Variables
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization':'Bearer ' + this.token
    });

    return headers;

  }

  /**
   * Forma la URL a donde se va a hacer la petición
   *
   * @param query:string La URI con el tipo de petición que
   * se va a hacer (álbumes, artistas, etc)
   * @return urlBase:string URL a donde se va a hacer la petición
   */
  getQuery(query: string): string{

    // Variables
    let urlBase: string= "https://api.spotify.com/v1/"+query;

    return urlBase;

  }

  /**
   * Genera un token nuevo y llama a la función generarCookie()
   * para guardar el token
   */
  async getNewToken(){

    // Variables
    const query = "https://accounts.spotify.com/api/token";
    let token = 'Basic ' + btoa(`fdea85fe321f4224a9b88b9caf6358d9:565e8b035de14bc18f612ed1adaa3139`);

    let promise = async function() {

      const res = await fetch(query, {
        method: 'POST',
        body: `grant_type=client_credentials&redirect_uri=${encodeURIComponent("http://localhost:8080/callback")}`,
        headers: {
          Authorization: token,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then((result) => result.json())
        .then((data) => data.access_token)
      return res;

    }

    const data = await promise();
    this.token = data;

    this.generarCookie();

  }

  /**
   * Método que forma una petición para recibir a los álbumes
   * y canciones más recientes y populares
   *
   * @param query:string URI que indica que la petición se
   * va a realizar a las canciones más recientes y populares
   * @return Object:any Objeto con los datos de los álbumes
   * y canciones
   */
  getNewReleases(query: string){
  // getNewReleases():Observable<any>{

    // Variables
    const headers: HttpHeaders = this.getHeader();

    return this.http.get(this.getQuery(query), {headers})
      .pipe( map((data: any) => data.albums.items ));

  }

  /**
   * Método que forma una petición para recibir a los artistas
   * que coincidan con la búsqueda
   *
   * @param query:string URI formada por parámetros (entre ellos lo
   * que ha escrito el usuario en el buscador) que se pasarán por GET
   * mediante la URL
   * @return Object:any Objeto con los datos de los artistas
   */
  getNewArtists(query: string){

    // Variables
    const headers: HttpHeaders = this.getHeader();

    return this.http.get(this.getQuery(query),{headers})
     .pipe( map((data: any) => data.artists.items ));

  }

  /**
   * Reedirecciona a la página donde se muestra el detalle
   * de un artista en concreto
   *
   * @param item:any Objeto que contiene el id del artista
   */
  verArtista(item: any){

    // Variables
    let idArtista:string;

    if (item.type === 'artist')
      idArtista = item.id;
    else
      idArtista = item;
    console.log(idArtista)

    this.router.navigate(['artist',idArtista]);

  }

  /**
   * Realiza una petición a la API de Spotify
   * para devolver los datos del artista
   *
   * @param id:string ID del artista
   * @return Object:any Objeto con los datos del artista
   */
  getArtist(id: string) {

    // Variables
    const headers: HttpHeaders = this.getHeader();

    return this.http.get(this.getQuery(`artists/${id}`), {headers})
      .pipe(map((data: any) => data));

  }

  /**
   * Realiza una petición a la API de Spotify
   * para devolver los datos de las canciones
   * del artista
   *
   * @param id:string ID del artista
   * @return Object:any Objeto con los datos
   * de las canciones del artista
   */
  getTopTracks(id: string){

    // Variables
    const headers: HttpHeaders = this.getHeader();

    return this.http.get(this.getQuery(`artists/${id}/top-tracks?country=us`), {headers})
      .pipe(map((data: any) => data.tracks));

  }

  /**
   * Almacena el número del error
   *
   * @param numeroError Número del error que se
   * ha producido
   */
  guardarError(numeroError: number){

    this.numeroError = numeroError;

  }

  /**
   * Genera una cookie para almacenar el token
   */
  generarCookie(){

    let fechaCaducidad = new Date();
    // Durabilidad: 1h
    // fechaCaducidad.setTime(fechaCaducidad.getTime() + (3600 * 1000));
    // Durabilidad: 1 mes
    fechaCaducidad.setDate(fechaCaducidad.getDate() + 30);

    document.cookie = `token=${this.token};expires=${fechaCaducidad}`;

  }

  /**
   * Devuelve el valor de la propiedad desead de la cookie
   *
   * @param cname:string Nombre de la propiedad de la cookie
   */
  obtenerCookie(cname: string){

    let cookie = document.cookie.split(';');
    for (const propiedad of cookie) {
      if(propiedad.includes(cname)){
        let valor = propiedad.split('=');
        return valor[1];
      }
    }
    return "";

  }

}
