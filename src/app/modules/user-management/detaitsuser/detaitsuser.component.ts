import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/_services/auth.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-detaitsuser',
  templateUrl: './detaitsuser.component.html',
  styleUrls: ['./detaitsuser.component.scss']
})
export class DetaitsuserComponent implements OnInit {
listAgents:any = [];
timeNombre: any;
isLoading$: Observable<boolean>;
  constructor(private router: Router,
              private agentService: AgentService,
              private  auth2Service: AuthService
    ) { 
      this.isLoading$ = this.auth2Service.isLoading$;
    }

  ngOnInit(): void {
    this.getAllAgents()
  }
  setCurrentTab() {
    console.log("tunchi");
    this.router.navigate(['/user-management/user']);
    // this.listAgents.push("element");
  }

    getAllAgents() {
      this.auth2Service.isLoadingSubject.next(true);
     this.agentService.getListAgent()
     .subscribe((data)=>{
       this.listAgents = data;
       this.auth2Service.isLoadingSubject.next(false);
       console.log(data)
      
      //this.listAgents.push("tunchi1");
     })
   
  }

  updateetat(param:any){
    param.etat = !param.etat
    this.agentService.UpdateAgent(param)
    .subscribe((data)=>{
      this.getAllAgents();
    })
  }
}
