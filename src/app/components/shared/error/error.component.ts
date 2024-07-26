import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: [ './error.component.css' ]
})
export class ErrorComponent implements OnInit {

  // Atributtes
  mensajeError: string;
  tokenError: boolean;

  constructor(private _spotifyService: SpotifyService) {

    this.mensajeError = "";
    this.tokenError = false;

    this.generarMensaje(this._spotifyService.numeroError, this._spotifyService.token)

  }

  ngOnInit(): void {
  }

  /**
   * Genera un mensaje personalizado a raíz
   * del número de error que recibe
   *
   * @param numeroError:number Número del error que se ha producido
   */
  generarMensaje(numeroError: number, token: string){

    switch (numeroError){
      case 400:
        this.mensajeError = "No dispones de ningún token.";
        this.tokenError = true;
        break;
      case 401:
        this.mensajeError = `El token ${token} ha expirado.`;
        this.tokenError = true;
        break;
      default:
        this.mensajeError = "Se ha producido un error inesperado.";
        break;
    }

  }

  /**
   * Llama al método getNewToken() de la clase SpotifyService
   * para que genere un token nuevo
   */
  async nuevoToken(){

    await this._spotifyService.getNewToken();
    window.location.reload();

  }

}
