import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  // Se recibe la canción
  @Input() cancion: any;
  // Se manda la visibilidad
  @Output() event = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Envia al padre si el reproductor debe ser visible
   * o no
   */
  sendVisibility(){

    this.event.emit(false);

  }

}
