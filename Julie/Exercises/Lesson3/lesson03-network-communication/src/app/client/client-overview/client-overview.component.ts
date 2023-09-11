import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/IClient'
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit {

  client$!: Observable<IClient[]>
  constructor(private clientService: ClientService){}

  ngOnInit(): void{
    this.client$ = this.clientService.getClients()
  }

}
