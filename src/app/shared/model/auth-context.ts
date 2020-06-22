import { UserProfile } from './user-profile';
import { SimpleClaim } from './simple-claim';

export class AuthContext {
  claims: SimpleClaim[];
  userProfile: UserProfile;

  get isAdmin(): boolean {
    return !!this.claims && !!this.claims.find((c) => c.type === 'role' && c.value === 'Admin');
  }

  get isMember(): boolean {
    return !!this.claims && !!this.claims.find((c) => c.type === 'role' && c.value === 'Member');
  }

  get roles(): string[] {
    return this.claims ? this.claims.filter((c) => c.type === 'role').map((x) => x.value) : [];
  }
}
