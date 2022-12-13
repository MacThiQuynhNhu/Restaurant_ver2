using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
using System.Web.Script.Serialization;
using System.Globalization;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.IO;
using System.Drawing;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using System.Data.Entity;
using Restaurant.Models.Function;
using PagedList;
namespace Restaurant.Controllers.Manager
{
    public class Manager_DauBepController : Controller
    {
        Model1 db = new Model1();
        // GET: Manager_DauBep
        public ActionResult Index(int? size, int? page, string searchString)
        {

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
            var properties = typeof(DauBep).GetProperties();
            List<Tuple<string, bool, int>> list = new List<Tuple<string, bool, int>>();
            List<string> listHeadings = new List<string>();
            listHeadings.Add("STT");
            listHeadings.Add("Mã đầu bếp");
            listHeadings.Add("Họ và tên");
            listHeadings.Add("Số điện thoại");
            listHeadings.Add("Địa chỉ");
            listHeadings.Add("Mô tả");
            listHeadings.Add("Ghi chú");
            foreach (var item in properties)
            {
                int order = 999;
                var isVirtual = item.GetAccessors()[0].IsVirtual;

                if (item.Name == "TenDauBep")
                {
                    order = 2;
                }
                else if (item.Name == "MaDauBep")
                {
                    order = 1;
                }
                else if (item.Name == "SoDienThoai")
                {
                    order = 3;
                }
                else if (item.Name == "DiaChi")
                {
                    order = 4;
                }
                else if (item.Name == "MoTa")
                {
                    order = 5;
                }
                else if (item.Name == "GioiTinh")
                {
                    order = 6;
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
                } else if (i == 1)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 10%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 2)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 10%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 3)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 15%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 4)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
                else if (i == 5)
                {
                    ViewBag.Headings += "<th style=\"text-align: center; width: 25%\" id=\"" + item.Item1 + "\">" + listHeadings[i] + "</th>";
                }
            }
            ViewBag.Headings += "<th style=\"text-align: center\" id=\"task\">" + listHeadings[7] + "</th>";
            // 4. Truy vấn lấy tất cả đường dẫn
            var alldoc = from l in db.DauBeps select l;
            //var alldoc = db.DOCUMENTs.ToList();
            // 5.1. Thêm phần tìm kiếm
            if (!String.IsNullOrEmpty(searchString))
            {
                alldoc = alldoc.Where(s => s.MaDauBep.Contains(searchString) || s.TenDauBep.Contains(searchString) || s.MoTa.Contains(searchString) || s.DiaChi.Contains(searchString) || s.SoDienThoai.Contains(searchString));
            }
            alldoc = alldoc.OrderBy(x => x.MaDauBep);


            // 5.2. Nếu page = null thì đặt lại là 1.
            if (page == null) page = 1;

            // 5.3. Tạo kích thước trang (pageSize), mặc định là 5.
            int pageSize = (size ?? 10);
            if (size == null) pageSize = 10;

            ViewBag.pageSize = pageSize;
            ViewBag.listDauBep = db.DauBeps.ToList();
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


        [HttpPost]
        public JsonResult getDetail(string id)
        {
            DauBep chef = db.DauBeps.SingleOrDefault(x => x.MaDauBep == id);
            return Json(new { res = chef });
        }
        [HttpPost]
        public JsonResult addChef(string TenDauBep, string DiaChi, string SoDienThoai, string HinhAnh, string GioiTinh, string Mota)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<DauBep> listChef = context.DauBeps.ToList();
                    int count = listChef.Count();
                    DauBep lastChef = listChef.ElementAt(count - 1);
                    string id = (DateTime.UtcNow).ToString();
                    string day = (id.Split(' ')[0]).Replace('/', '_');
                    string time = (id.Split(' ')[1]).Replace(':', '_');
                    string next_id = "DB" + time;
                    DauBep newDb = new DauBep();
                    newDb.MaDauBep = next_id;
                    newDb.TenDauBep = TenDauBep;
                    newDb.DiaChi = DiaChi;
                    newDb.SoDienThoai = SoDienThoai;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    newDb.HinhAnh = img;
                    if (GioiTinh == "0")
                    {
                        newDb.GioiTinh = false;
                    }
                    else
                    {
                        newDb.GioiTinh = true;
                    }
                    newDb.MoTa = Mota;
                    context.DauBeps.Add(newDb);
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
        public JsonResult editChef(string MaDauBep, string TenDauBep, string DiaChi, string SoDienThoai, string HinhAnh, string GioiTinh, string Mota)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DauBep chef = context.DauBeps.SingleOrDefault(x => x.MaDauBep == MaDauBep);
                    chef.TenDauBep = TenDauBep;
                    chef.DiaChi = DiaChi;
                    chef.SoDienThoai = SoDienThoai;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    chef.HinhAnh = img;
                    if (GioiTinh == "0")
                    {
                        chef.GioiTinh = false;
                    }
                    else
                    {
                        chef.GioiTinh = true;
                    }
                    chef.MoTa = Mota;
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

        public JsonResult deleteChef(string MaDauBep)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DauBep chef = context.DauBeps.SingleOrDefault(x => x.MaDauBep == MaDauBep);
                    chef.MoTa = "Blocked";
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
    }
}