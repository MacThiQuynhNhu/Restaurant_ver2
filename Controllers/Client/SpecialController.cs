using PagedList;
using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Xml;
namespace Restaurant.Controllers.Client
{
    public class SpecialController : Controller
    {
        private Model1 db = new Model1();
        // GET: News

        //public List[KhuyenMai] 
        public ActionResult Index()
        {
            var khuyenmai = db.KhuyenMais.ToList();
            return View(khuyenmai);
        }
        //public ActionResult DetailKhuyenmai(string id)
        //{
        //    if ( id == null)
        //    {
        //        return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest); 
        //    }
        //    var monAn = new MonAn()
        //}


        public ActionResult subSpecial(string id)
        {
            var subspecial = ViewDetail(id);
            ViewBag.khuyenmai = ViewDetail(subspecial.MaKhuyenMai);
            return View(subspecial);
        }

        public KhuyenMai ViewDetail(string id)
        {
            return db.KhuyenMais.Find(id);
        }

    }
}