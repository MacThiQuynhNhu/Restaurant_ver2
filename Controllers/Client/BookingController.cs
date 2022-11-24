using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers.Client
{
    public class BookingController : Controller
    {
        // GET: Booking

        private Model1 cons = new Model1();
        public ActionResult Index()
        {
            using (var con = new Model1())
            {
                ViewBag.DanhSachBan = cons.Bans.ToList();
                return View();
            }
        }
      
        [HttpPost]
        public ActionResult Index(BanDat_KhachHang model)
        {
            using (var con = new Model1())
            {
                //kiểm tra xem trong bảng khách hàng đã có khách hàng này chưa
                List<KhachHang> listChef = con.KhachHangs.ToList();
                bool daCo = false;
                string makh = "";
                foreach (var item in listChef)
                {
                    if (item.TenKhachHang == model.HoTen && item.SDT == model.SoDienThoai)
                    {
                        daCo = true;
                        makh = item.MaKhachHang;
                        break;
                    }
                }

                // chưa có khách hàng đó trong cơ sở dữ liệu thì thêm vào, đã có rồi thì thôi
                if (!daCo)
                {
                    int count = listChef.Count();
                    //KhachHang lastChef = listChef.ElementAt(count - 1);
                    //string temp_id = lastChef.MaKhachHang;
                    string next_id = "KH" + (count+1).ToString();
                    KhachHang kh = new KhachHang();
                    kh.MaKhachHang = next_id;
                    kh.TenKhachHang = model.HoTen;
                    kh.SDT = model.SoDienThoai;
                    con.KhachHangs.Add(kh);
                    makh = kh.MaKhachHang;
                }


                List<BanDatTruoc> listBan = con.BanDatTruocs.ToList();
                int count2 = listBan.Count();
                string next_id2 = "BT" + (count2 + 1).ToString();
                BanDatTruoc ban = new BanDatTruoc();

                ban.MaKhachHang = makh;
                ban.MaBanDatTruoc = next_id2;
                ban.SoLuong = model.SoLuong;
                ban.Ngay = model.Ngay;
                ban.Gio = model.Gio;
                ban.GhiChu = model.GhiChu;
                con.BanDatTruocs.Add(ban);

                con.SaveChanges();
                return RedirectToAction("Index");
            }
        }
      
    }
}