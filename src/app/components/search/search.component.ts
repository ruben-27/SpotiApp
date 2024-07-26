import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  // Atributtes
  artistas: any;
  loading: boolean;
  error: boolean;
  control:boolean;

  constructor(private _spotifyService: SpotifyService, private activedRoute: ActivatedRoute) {

    this.loading = true;
    this.error = false;
    this.control=false;

  }

  ngOnInit(): void {
  }

   /**
   * Realiza una petición a la API de Spotify
   * para buscar artistas por su nombre
   *
   * @param valor:string String que ha escrito el usuario
   * en el buscador
   */
  buscar(valor: string){

    // Variables
    let queryArtist = "search?q=" + valor + "&type=artist&limit=15";

    this._spotifyService.getNewArtists(queryArtist)
      .subscribe(data => {
        // console.log(data)
        this.artistas = data;
        this.loading = false;
      }, (errorServicio) => {
        this._spotifyService.guardarError(errorServicio.status);
        this.error = true;
        this.loading = false;
      });

  }

  /**
   * Llama al método verArtista de la clase SpotifyService
   * y le pasa como parámetro el objeto del artista
   *
   * @param item:any Objeto que contiene el id del artista
   */
  verArtista(item: any) {

    this._spotifyService.verArtista(item);

  }

}
