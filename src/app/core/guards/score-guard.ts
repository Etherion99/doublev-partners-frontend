import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { lastValueFrom } from "rxjs";
import { GithubService } from "src/app/shared/services/github.service";

@Injectable({
  providedIn: 'root'
})
export class ScoreGuard {
  constructor(
    private router: Router,
    private readonly githubService: GithubService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // por alguna razón la API está devolviendo solo 1 de score aún consultando perfiles muy exitosos
    const apiHasReliableScores = false;

    if(apiHasReliableScores) {
      const login = next.params['login'];
    
      // consultar y verificar el score del usuario según la API de Github 
      try {
        const usersData: any = await lastValueFrom(this.githubService.searchUsers(login));
        const user = usersData?.items.find((item: any) => login === item.login);
    
        if (user?.score >= 30.0) {
          return true;
        } else {
          this.router.navigate(['/errors/not-allowed']);
          return false;
        }
      } catch (error) {
        console.error(error);
        this.router.navigate(['/errors/not-allowed']);
        return false;
      }
    }else{
      const score = next.queryParams['score'];

      if (score >= 30) {
        return true;
      } else {
        this.router.navigate(['/errors/not-allowed']);
        return false;
      }
    }

    
  }
}