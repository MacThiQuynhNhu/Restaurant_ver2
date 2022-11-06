using PagedList.Mvc;
using PagedList;
using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Client
{
    public class NewsController : Controller
    {
        private Model1 db = new Model1();
        // GET: News
        public ActionResult Index()
        {

            //List<BaiViet> listemp = db.BaiViets.ToList();
            return View(db.BaiViets.ToList());
        }



        public IEnumerable<BaiViet> ListAllPaging(string searchString, int page, int pageSize)
        {
            IQueryable<BaiViet> model = db.BaiViets;
            if (!string.IsNullOrEmpty(searchString))
            {
                model = model.Where(x => x.TieuDe.Contains(searchString) || x.NoiDung.Contains(searchString));
            }
            return model.OrderByDescending(x => x.MaBaiViet).ToPagedList(page, pageSize);
        }

        public ActionResult SubNew(string id)
        {
            var subnew = ViewDetail(id);
            ViewBag.BaiViet = ViewDetail(subnew.MaBaiViet);
            return View(subnew);
        }

        public BaiViet ViewDetail(string id)
        {
           return db.BaiViets.Find(id);
        }

    }
}