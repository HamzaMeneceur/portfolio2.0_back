"use strict";
const project = {
    allBtn: document.querySelectorAll('.btn-mod-in'),
    modalAdd: document.getElementById('modal-add'),
    modalUpdate: document.getElementById('modal-update'),
    modalDelete: document.getElementById('modal-delete'),
    handleFormAdd() {
        project.allBtn[0].addEventListener('click', (event) => {
            if (project.modalAdd)
                project.modalAdd.style.display = (project.modalAdd.style.display === 'flex') ? 'none' : 'flex';
        });
    },
    handleFormUpdate() {
        project.allBtn[1].addEventListener('click', (event) => {
            if (project.modalUpdate)
                project.modalUpdate.style.display = (project.modalUpdate.style.display === 'flex') ? 'none' : 'flex';
        });
    },
    handleFormDelete() {
        project.allBtn[2].addEventListener('click', (event) => {
            if (project.modalDelete)
                project.modalDelete.style.display = (project.modalDelete.style.display === 'flex') ? 'none' : 'flex';
        });
    },
    init() {
        project.handleFormAdd();
        project.handleFormUpdate();
        project.handleFormDelete();
    }
};
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Dom running time");
    project.init();
});
