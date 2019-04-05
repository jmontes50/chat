import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  constructor(public _sWebsocket:WebsocketService) {}
  
  ngOnInit() {

  }
}