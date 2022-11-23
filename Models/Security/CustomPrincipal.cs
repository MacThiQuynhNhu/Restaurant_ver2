using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Linq;
using System.Web;
using Restaurant.Models.Function;

namespace Restaurant.Models.Security
{
    public class CustomPrincipal : IPrincipal

    {
        private account account;
        public CustomPrincipal(account account)
        {
            this.account = account;
            this.Identity = new GenericIdentity(account.UserName);
        }

        public IIdentity Identity
        {
            get;
            set;
        }

        public bool IsInRole(string role)
        {
            var roles = role.Split(new char[] { ',' });
            bool kq = roles.Any(r => this.account.Roles.Contains(r));
            return kq;
        }
    }
}