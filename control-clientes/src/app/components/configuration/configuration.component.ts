import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Configuration } from 'src/app/models/configuration.model';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {


  permitirRegistro:boolean = false;
  constructor(private router:Router, private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.configService.getConfiguration().subscribe(
    (configuration: Configuration) => {
      this.permitirRegistro = configuration.permitirRegistro;
    }
    )
  }

  save(){
    let configuration = {permitirRegistro: this.permitirRegistro};
    this.configService.modifyConfiguration(configuration);
    this.router.navigate(['/board/customers']);
  }

}
