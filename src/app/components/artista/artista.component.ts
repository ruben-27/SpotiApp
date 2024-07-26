import {Component, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";
import { MusicPlayerComponent } from "../shared/music-player/music-player.component";

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: [ './artista.component.css' ]
})
export class ArtistaComponent implements OnInit {

  // Attributes
  artista: any = {};
  topTracks: any[] = [];
  track: any;
  loading: boolean;
  error: boolean;
  reproductor: boolean;

  constructor(private activatedRoute: ActivatedRoute, private _spotifyService: SpotifyService) {

    this.loading = true;
    this.error = false;
    this.reproductor = false;

    this.activatedRoute.params.subscribe(parametros => {
      this.getArtista(parametros['id']);
      this.getTopTracks(parametros['id']);
    });

  }

  ngOnInit(): void {
  }

  /**
   * Almacena los datos del artista
   *
   * @param id:string ID del artista
   */
  getArtista(id: string){

    this._spotifyService.getArtist(id)
      .subscribe(artista => {
        // console.log(artista);
        this.artista = artista;
        this.loading = false;
      }, (errorServicio) => {
        this._spotifyService.guardarError(errorServicio.status);
        this.error = true;
        this.loading = false;
      });

  }

  /**
   * Almacena los datos de las canciones
   * del artista
   *
   * @param id:string ID del artista
   */
  getTopTracks(id: string){

    this._spotifyService.getTopTracks(id)
      .subscribe(tracks => {
        // console.log(tracks);
        this.topTracks = tracks;
        this.loading = false;
      }, (errorServicio) => {
        this._spotifyService.guardarError(errorServicio.status);
        this.error = true;
        this.loading = false;
      });

  }

  /**
   * Almacena los datos de la canción y habilita la visibilidad
   * del reproductor
   *
   * @param cancion:any Objeto que contiene todos los datos
   * de la canción
   */
  reproducirCancion(cancion: any){

    this.track = cancion;
    this.reproductor = true;

  }

  /**
   * Recibe si el reproductor debe estar visible o no
   *
   * @param $event Evento de parte del hijo (MusicPlayer)
   */
  receiveVisibility($event: any){

    this.reproductor = $event;

  }

}
