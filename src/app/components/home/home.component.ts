import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SpotifyService } from "../../services/spotify.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  // Atributtes
  nuevasCanciones: any;
  queryRelease: string;
  loading: boolean;
  error: boolean;

  constructor(private http: HttpClient, private _spotifyService: SpotifyService, private activatedRoute: ActivatedRoute) {

    this.nuevasCanciones = [];
    this.queryRelease = "browse/new-releases";
    this.loading = true;
    this.error = false;

    this.mostrarHome();

  }

  ngOnInit(): void {
  }

  /**
   * Carga todo el contenido de Home de manera asíncrona, para
   * esperarse a que se genere el token
   */
  async mostrarHome(){

    await this._spotifyService.getNewReleases(this.queryRelease)
      .subscribe((data: any) => {
        // console.log(data)
        this.nuevasCanciones = data;
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
  verArtista(item: any){

    this._spotifyService.verArtista(item);

  }

}
