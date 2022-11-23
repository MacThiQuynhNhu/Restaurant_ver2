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
            var query = (from s in db.MonAns
                         join c in db.MonAn_KhuyenMai on s.MaMonAn equals c.MaMonAn
                         join t in db.KhuyenMais on c.MaKhuyenMai equals t.MaKhuyenMai
                         select new sieukhuyenmai
                         {

                             monan = s,
                             monan_khuyenmai = c,
                             khuyenmai = t,

                             //s.TenMonAn,
                             //s.Gia,
                             //s.HinhAnh,
                             //s.DonViTinh,
                             //s.MoTa,
                             //t.ThoiGianBatDau, 
                             //t.ThoiGianKetThuc, 
                             //t.MucKhuyenMai, 
                             //t.DoiTuongApDung, 
                             //t.Mota
                         }).ToList();

            return View(query);
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