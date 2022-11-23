using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Google.Apis.Admin.Directory.directory_v1.Data;
using Restaurant.Models.Security;
using Restaurant.Models.Function;
using ICSharpCode.Decompiler.CSharp.Syntax;

namespace Restaurant.Controllers.Client
{
    public class BookingController : Controller
    {
        // GET: Booking
        //[CustomAuthorize(Roles = "Admin")]
        //[AllowAnonymous(Roles = "")]
        public ActionResult Index()
        {
            return View();
        }
    }
}