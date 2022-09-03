import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cra } from '../../core/interfaces/cra';
import { State } from '../../core/enums/state.enum';
import { TokenStorageService } from '../token/token-storage.service';
import { API_URL } from '../../core/constants/url.constant';

@Injectable({
  providedIn: 'root'
})
export class CraService {

  constructor(private http: HttpClient,private tokenStorage:TokenStorageService) { }

  getAllForUser(): Observable<Cra[]>{
    let id = this.tokenStorage.getUserInfoFromStorage()["sub"];
    return this.http.get<Cra[]>(API_URL+"users/"+id+"/trackingtimes")
  }

  updateOneTrackingtimes(id:number,id_tt:number,cra:Cra): Observable<any>{
    return this.http.patch(API_URL+"users/"+id+"/trackingtimes/"+id_tt,cra);
  }

  getOne(id:number): Observable<Cra>{
    return this.http.get<Cra>(API_URL+"trackingtimes/"+id)
  }

  create(cra:Cra){
    return this.http.post(API_URL+"trackingtimes",cra);
  }

  removeOne(id:number): Observable<any>{
    return this.http.delete(API_URL+"trackingtimes/"+id)
  }

  getAllForAdmin(): Observable<Cra[]>{
    return this.http.get<Cra[]>(API_URL+"trackingtimes")
  }

  setState(id:number,state:State): Observable<any>{
    return this.http.put(API_URL+"trackingtimes/"+id,{"state":state});
  }
}
