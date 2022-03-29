import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Gif } from 'src/app/gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  /* styleUrls: ['./sidebar.component.css'] */
})
export class SidebarComponent {
  public results: Gif[] = [];

  get gifs(): string[] {
    return this.gifsService.history;
  }

  constructor(private gifsService: GifsService) {}

  findGif(gif: string) {
    this.gifsService.results = this.gifsService.gralResults[gif];
    localStorage.setItem('data', JSON.stringify(this.gifsService.results));
  }

  clear() {
    localStorage.clear();
    this.gifsService.gralResults = {};
    this.gifsService.results = [];
    this.gifsService.clearHistory();
  }
}
