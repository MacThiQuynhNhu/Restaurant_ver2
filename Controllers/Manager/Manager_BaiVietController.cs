using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using PagedList;
namespace Restaurant.Controllers.Manager
{
    public class Manager_BaiVietController : Controller
    {
        // GET: Manager_BaiViet
        public ActionResult Index(int? size, int? page, string searchString)
        {
            Model1 db = new Model1();
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
            var properties = typeof(BaiViet).GetProperties();
            List<Tuple<string, bool, int>> list = new List<Tuple<string, bool, int>>();
            List<string> listHeadings = new List<string>();
            listHeadings.Add("STT");
            listHeadings.Add("Mã");
            listHeadings.Add("Tiêu đề");
            listHeadings.Add("Hình ảnh");
            listHeadings.Add("Nội dung");
            foreach (var item in properties)
            {
                int order = 999;
                var isVirtual = item.GetAccessors()[0].IsVirtual;

                if (item.Name == "TieuDe")
                {
                    order = 2;
                }
                else if (item.Name == "MaBaiViet")
                {
                    order = 1;
                }
                else if (item.Name == "Link")
                {
                    order = 3;
                }
                else if (item.Name == "NoiDung")
                {
                    order = 4;
                }
                else if (item.Name == "HinhAnh")
                {
                    order = 5;
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
                if (i == 0)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 5%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 1)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 5%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 2)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 15%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 3)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 4)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 40%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
            }
            ViewBag.Headings += "<th style=\"text-align: center\" id=\"task\">" + listHeadings[5] + "</th>";
            // 4. Truy vấn lấy tất cả đường dẫn
            var alldoc = from l in db.BaiViets select l;
            //var alldoc = db.DOCUMENTs.ToList();
            // 5.1. Thêm phần tìm kiếm
            if (!String.IsNullOrEmpty(searchString))
            {
                alldoc = alldoc.Where(s => s.MaBaiViet.Contains(searchString) || s.TieuDe.Contains(searchString) || s.NoiDung.Contains(searchString));
            }
            alldoc = alldoc.OrderBy(x => x.MaBaiViet);


            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = (size ?? 10);
            if (size == null) pageSize = 10;

            ViewBag.pageSize = pageSize;
            ViewBag.listBaiViet = db.BaiViets.ToList();
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
        public ActionResult ThemMoi()
        {
            return View();
        }
        /*
        [HttpPost]
        public ActionResult Create(DauBep model, HttpPostedFileBase UrlAnh, string controller)
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

                    DauBepF spF = new DauBepF();
                    model.HinhAnh = fileName;
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
        }
        */
        public ActionResult Create()
        {
            var dm = new BaiVietF().DSBaiViet.Where(p => p.TieuDe != null);
            ViewBag.MaDM = new SelectList(dm, "MaBaiViet", "TieuDe", null);
            return View();
        }
        [HttpPost]
        public ActionResult Create(BaiViet model, HttpPostedFileBase UrlAnh, string controller)
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

                    BaiVietF spF = new BaiVietF();
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

        public ActionResult CapNhat(string MaBaiViet)
        {
            Model1 db = new Model1();
            BaiViet model2 = db.BaiViets.Find(MaBaiViet);
            return View(model2);
        }
        [HttpPost]
        public ActionResult CapNhat(BaiViet model)
        {
            
            Model1 db = new Model1();
            ViewBag.capnhat = db.BaiViets.ToList();
            //tim doi tuong
            var updateModel = db.BaiViets.Find(model.MaBaiViet);
            //gan gia tri
            updateModel.TieuDe = model.TieuDe;
            updateModel.HinhAnh = model.HinhAnh;
            updateModel.NoiDung = model.NoiDung;
            //luu thay doi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Xoa(string MaBaiViet)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.BaiViets.Find(MaBaiViet);
            //XOa
            db.BaiViets.Remove(updateModel);
            //luu thay doi
            db.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}