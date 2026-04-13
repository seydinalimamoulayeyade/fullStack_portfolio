const DELETED_KEY = "slly_deleted_ids"; // ids des projets statiques supprimés
const PROJECTS_KEY = "slly_projects"; // projets ajoutés via le formulaire

/**
 * Récupère la liste des ids statiques supprimés.
 * @returns {number[]}
 */
export function getDeletedIds() {
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Supprime un projet par son id.
 * Détecte automatiquement si c'est un projet statique ou ajouté.
 *
 * @param {number} id
 * @returns {boolean} true si la suppression a réussi
 */
export function deleteProject(id) {
  const numId = Number(id);

  // Cas 1 : projet ajouté via le formulaire (id >= 7 en général)
  try {
    const stored = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
    const idx = stored.findIndex((p) => p.id === numId);

    if (idx !== -1) {
      stored.splice(idx, 1);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(stored));
      return true;
    }
  } catch {
    // Continuer vers le cas 2
  }

  // Cas 2 : projet statique — on mémorise son id comme "supprimé"
  const deletedIds = getDeletedIds();
  if (!deletedIds.includes(numId)) {
    deletedIds.push(numId);
    localStorage.setItem(DELETED_KEY, JSON.stringify(deletedIds));
  }
  return true;
}

/**
 * Restaure tous les projets supprimés (projets statiques et ajoutés).
 * Utile pour un reset complet de l'admin.
 */
export function restoreAllProjects() {
  localStorage.removeItem(DELETED_KEY);
}

/**
 * Vérifie si un projet est supprimé.
 * @param {number} id
 * @returns {boolean}
 */
export function isDeleted(id) {
  return getDeletedIds().includes(Number(id));
}
