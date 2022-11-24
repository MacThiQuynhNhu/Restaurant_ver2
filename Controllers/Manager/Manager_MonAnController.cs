using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using System.IO;
using PagedList;
namespace Restaurant.Controllers.Manager
{
    public class Manager_MonAnController : Controller
    {
        Model1 db = new Model1();
        // GET: Manager_MonAn
        public ActionResult Index(int? size, int? page, string searchString)
        {
            ViewBag.listTypeFood = db.LoaiMons.ToList();
            // 1. Tạo biến ViewBag gồm sortOrder, searchValue, sortProperty và page

            ViewBag.searchValue = searchString;
            ViewBag.page = page;

            // 2. Tạo danh sách chọn số trang
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "10", Value = "10" });
            items.Add(new SelectListItem { Text = "20", Value = "20" });
            items.Add(new SelectListItem { Text = "25", Value = "25" });
            items.Add(new SelectListItem { Text = "50", Value = "50" });
            items.Add(new SelectListItem { Text = "100", Value = "100" });
            items.Add(new SelectListItem { Text = "200", Value = "200" });

            // 2.1. Thiết lập số trang đang chọn vào danh sách List<SelectListItem> items
            foreach (var item in items)
            {
                if (item.Value == size.ToString()) item.Selected = true;
            }
            ViewBag.size = items;
            ViewBag.currentSize = size;

            // 3. Lấy tất cả tên thuộc tính của lớp DOCUMENT
            var properties = typeof(MonAn).GetProperties();
            List<Tuple<string, bool, int>> list = new List<Tuple<string, bool, int>>();
            List<string> listHeadings = new List<string>();
            listHeadings.Add("STT");
            listHeadings.Add("Món ăn");
            listHeadings.Add("Giá");
            listHeadings.Add("Đơn vị tính");
            listHeadings.Add("Mô tả");
            listHeadings.Add("Thời gian ra mắt");
            listHeadings.Add("Phân loại");
            foreach (var item in properties)
            {
                int order = 999;
                var isVirtual = item.GetAccessors()[0].IsVirtual;

                if (item.Name == "TenMonAn")
                {
                    order = 2;
                }
                else if (item.Name == "MaLoaiMon")
                {
                    order = 1;
                }
                else if (item.Name == "DonViTinh")
                {
                    order = 3;
                }
                else if (item.Name == "Gia")
                {
                    order = 4;
                }
                else if (item.Name == "MoTa")
                {
                    order = 5;
                }
                else if (item.Name == "ThoiGianRaMat")
                {
                    order = 6;
                }
                else if (item.Name == "MaMonAn")
                {
                    order = 7;
                }
                else continue;

                Tuple<string, bool, int> t = new Tuple<string, bool, int>(item.Name, isVirtual, order);
                list.Add(t);
            }
            listHeadings.Add("Thao tác");
            list = list.OrderBy(x => x.Item3).ToList();
            // 3.1. Tạo Heading sắp xếp cho các cột
            int i = -1;
            foreach (var item in list)
            {
                i++;
                ViewBag.Headings += "<th style=\"text-align: center\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
            }
            ViewBag.Headings += "<th id=\"task\">" + listHeadings[7] + "</th>";
            // 4. Truy vấn lấy tất cả đường dẫn
            var alldoc = from l in db.MonAns select l;
            //var alldoc = db.DOCUMENTs.ToList();
            // 5.1. Thêm phần tìm kiếm
            if (!String.IsNullOrEmpty(searchString))
            {
                alldoc = alldoc.Where(s => s.MaMonAn.Contains(searchString) || s.TenMonAn.Contains(searchString) || s.MoTa.Contains(searchString) || s.DonViTinh.Contains(searchString));
            }
            alldoc = alldoc.OrderBy(x => x.MaMonAn);


            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = (size ?? 10);
            if (size == null) pageSize = 10;

            ViewBag.pageSize = pageSize;
            ViewBag.listFood = db.MonAns.ToList();
            // 6. Toán tử ?? trong C# mô tả nếu page khác null thì lấy giá trị page, còn
            // nếu page = null thì lấy giá trị 1 cho biến pageNumber. 
            int pageNumber = (page ?? 1);
            ViewBag.pageNumber = pageNumber;

            // 6.2 Lấy tổng số record chia cho kích thước để biết bao nhiêu trang
            int checkTotal = (int)(alldoc.ToList().Count / pageSize) + 1;
            // Nếu trang vượt qua tổng số trang thì thiết lập là 1 hoặc tổng số trang
            if (pageNumber > checkTotal) pageNumber = checkTotal;
            return View(alldoc.ToPagedList(pageNumber, pageSize));
        }

        /*cuong*/
        public ActionResult Create()
        {
            var dm = new MonAnF().DSBaiViet.Where(p => p.TenMonAn != null);
            ViewBag.MaDM = new SelectList(dm, "MaMonAn", "TenMonAn", null);
            return View();
            using (var con = new Model1())
            {
                var model = con.MonAns.ToList();
                return View(model);
            }
        }
        [HttpPost]
        public JsonResult getDetail(string id)
        {
            MonAn food = db.MonAns.SingleOrDefault(x => x.MaMonAn == id);
            return Json(new
            {
                MaMonAn = food.MaMonAn,
                TenMonAn = food.TenMonAn,
                Gia = food.Gia,
                DonViTinh = food.DonViTinh,
                MoTa = food.MoTa,
                HinhAnh = food.HinhAnh,
                ThoiGianRaMat = food.ThoiGianRaMat
            });
        }
        [HttpPost]
        public JsonResult addFood(string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<MonAn> listFood = context.MonAns.ToList();
                    int count = listFood.Count();
                    MonAn lastFood = listFood.ElementAt(count - 1);
                    string temp_id = lastFood.MaMonAn;
                    string number = temp_id.Split('A')[1];
                    string next_id = "MA00" + (Int32.Parse(number) + 1).ToString();
                    MonAn newDb = new MonAn();
                    newDb.MaMonAn = next_id;
                    newDb.TenMonAn = TenMonAn;
                    newDb.Gia = Gia;
                    newDb.DonViTinh = DonViTinh;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    newDb.MoTa = Mota;
                    newDb.HinhAnh = img;
                    newDb.ThoiGianRaMat = DateTime.Now;
                    newDb.MaLoaiMon = MaLoaiMon;
                    context.MonAns.Add(newDb);
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }
        [HttpPost]
        public JsonResult editFood(string MaMonAn, string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
                    food.TenMonAn = TenMonAn;
                    food.Gia = Gia;
                    food.DonViTinh = DonViTinh;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    food.HinhAnh = img;
                    food.MoTa = Mota;
                    food.ThoiGianRaMat = ThoiGianRaMat;
                    food.MaLoaiMon = MaLoaiMon;
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }

        public JsonResult deleteFood(string MaMonAn)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
                    context.MonAns.Remove(food);
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }
        [HttpPost]
        public ActionResult Create(MonAn model, HttpPostedFileBase UrlAnh, string controller)
        {
            try
            {
                // TODO: Add update logic here

                if (UrlAnh == null)
                {
                    ModelState.AddModelError("File", "Chưa upload file ảnh");
                }
                else if (UrlAnh.ContentLength > 0)
                {                 //TO:DO
                    var fileName = Path.GetFileName(UrlAnh.FileName);
                    var path = Path.Combine(Server.MapPath("~/Content/Admin/assets/img"), fileName);
                    UrlAnh.SaveAs(path);                    //   

                    MonAnF spF = new MonAnF();
                    model.HinhAnh = fileName;
                    //model.HinhAnh = path;
                    if (spF.Insert(model))
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            catch
            {
                return View();
            }
            return View();
            /*
            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                con.BaiViets.Add(model);
                con.SaveChanges();
                return RedirectToAction("Index");
            }
            */
        }
        /* end cuong */
        //[HttpPost]
        //public JsonResult getDetail(string id)
        //{
        //    MonAn food = db.MonAns.SingleOrDefault(x => x.MaMonAn == id);
        //    return Json(new
        //    {
        //        MaMonAn = food.MaMonAn,
        //        TenMonAn = food.TenMonAn,
        //        Gia = food.Gia,
        //        DonViTinh = food.DonViTinh,
        //        MoTa = food.MoTa,
        //        HinhAnh = food.HinhAnh,
        //        ThoiGianRaMat = food.ThoiGianRaMat
        //    });
        //}
        //[HttpPost]
        //public JsonResult addFood(string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        //{
        //    var context = new Model1();
        //    using (DbContextTransaction transaction = context.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            List<MonAn> listFood = context.MonAns.ToList();
        //            int count = listFood.Count();
        //            MonAn lastFood = listFood.ElementAt(count - 1);
        //            string temp_id = lastFood.MaMonAn;
        //            string number = temp_id.Split('A')[1];
        //            string next_id = "MA00" + (Int32.Parse(number) + 1).ToString();
        //            MonAn newDb = new MonAn();
        //            newDb.MaMonAn = next_id;
        //            newDb.TenMonAn = TenMonAn;
        //            newDb.Gia = Gia;
        //            newDb.DonViTinh = DonViTinh;
        //            var splitFile = HinhAnh.Split('\\');
        //            string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
        //            newDb.MoTa = Mota;
        //            newDb.HinhAnh = img;
        //            newDb.ThoiGianRaMat = DateTime.Now;
        //            newDb.MaLoaiMon = MaLoaiMon;
        //            context.MonAns.Add(newDb);
        //            context.SaveChanges();
        //            transaction.Commit();
        //            return Json(new { status = true });
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            return Json(new { status = false });
        //        }
        //    }
        //}
       // [HttpPost]
        //public JsonResult editFood(string MaMonAn, string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        //{
        //    var context = new Model1();
        //    using (DbContextTransaction transaction = context.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
        //            food.TenMonAn = TenMonAn;
        //            food.Gia = Gia;
        //            food.DonViTinh = DonViTinh;
        //            var splitFile = HinhAnh.Split('\\');
        //            string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
        //            food.HinhAnh = img;
        //            food.MoTa = Mota;
        //            food.ThoiGianRaMat = ThoiGianRaMat;
        //            food.MaLoaiMon = MaLoaiMon;
        //            context.SaveChanges();
        //            transaction.Commit();
        //            return Json(new { status = true });
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            return Json(new { status = false });
        //        }
        //    }
        //}

        //public JsonResult deleteFood(string MaMonAn)
        //{
        //    var context = new Model1();
        //    using (DbContextTransaction transaction = context.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
        //            context.MonAns.Remove(food);
        //            context.SaveChanges();
        //            transaction.Commit();
        //            return Json(new { status = true });
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            return Json(new { status = false });
        //        }
        //    }
        //}
   }
}