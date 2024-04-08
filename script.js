var homeModal = document.getElementById("homeModal");
var securityModal = document.getElementById("securityModal");
var renameModal = document.getElementById("renameModal");
var componentToRename;

function openHomeModal() {
  homeModal.style.display = "block";
}

function closeHomeModal() {
  homeModal.style.display = "none";
}

function openSecurityModal() {
  securityModal.style.display = "block";
}

function closeSecurityModal() {
  securityModal.style.display = "none";
}

function addHomeComponent(type) {
  const componentType = document.getElementById("homeComponents");
  const componentCount = componentType.children.length + 1;
  let displayName;
  switch(type) {
    case 'soil':
      displayName = 'Soil Moisture Sensor';
      break;
    case 'heat':
      displayName = 'Heat Sensor';
      break;
    case 'harmfulGas':
      displayName = 'Harmful Gas Sensor';
      break;
    case 'light':
      displayName = 'Light Sensor';
      break;
    default:
      displayName = type;
  }
  const newComponent = createComponent(displayName, componentCount);
  componentType.appendChild(newComponent);
}

function addSecurityComponent(type) {
  const componentType = document.getElementById("securityComponents");
  const componentCount = componentType.children.length + 1;
  let displayName;
  switch(type) {
    case 'camera':
      displayName = 'Camera';
      break;
    case 'doorLock':
      displayName = 'Door Lock';
      break;
    case 'distanceSensor':
      displayName = 'Distance Sensor';
      break;
    default:
      displayName = type;
  }
  const newComponent = createComponent(displayName, componentCount);
  componentType.appendChild(newComponent);
}

function createComponent(displayName, count) {
  const newComponent = document.createElement('div');
  newComponent.classList.add('component');
  newComponent.dataset.name = displayName.replace(/\s+/g, '') + count;
  newComponent.innerHTML = `
    <p class="component-name">${displayName} ${count} 
        <label class="switch">
            <input type="checkbox" onchange="toggleUsability(this)">
            <span class="slider round"></span>
        </label>
        <button class="remove-button" onclick="showConfirmation(this)">Remove</button>
        <button class="rename-button" onclick="openRenameModal(this)">Rename</button>
    </p>`;
  return newComponent;
}

function showConfirmation(btn) {
    componentToRemove = btn.parentNode.parentNode;
    document.getElementById('confirmationDialog').style.display = 'block';
}

function openRenameModal(btn) {
    componentToRename = btn.parentNode.parentNode;
    renameModal.style.display = "block";
}

function closeRenameModal() {
    renameModal.style.display = "none";
}

function renameComponentInModal() {
    const newName = document.getElementById("newComponentName").value.trim();
    if (newName !== "") {
        const componentText = componentToRename.querySelector(".component-name");
        componentText.textContent = newName;
        closeRenameModal();
    }
}

function toggleUsability(input) {
    const component = input.parentNode.parentNode;
    if (input.checked) {
        component.classList.add('disabled');
        component.style.transition = 'background-color 0.3s ease'; // Add transition effect
        component.style.backgroundColor = '#28a745'; // Set background color to green when enabled
    } else {
        component.classList.remove('disabled');
        component.style.backgroundColor = ''; // Remove inline style to revert to default background color
    }
}

var activeDeviceCount = {
    home: 0,
    security: 0
};
var componentToRemove;

function confirmRemoval() {
    componentToRemove.parentNode.removeChild(componentToRemove);
    const category = componentToRemove.parentNode.parentNode.id; // Get the category from the parent node
    updateActiveDeviceCount(category, -1);
    hideConfirmation();
}

function cancelRemoval() {
    hideConfirmation();
}

function hideConfirmation() {
    const confirmationDialog = document.getElementById('confirmationDialog');
    confirmationDialog.style.display = 'none';
}

function updateActiveDeviceCount(category, change) {
    activeDeviceCount[category] += change;
    document.getElementById(`${category}Count`).innerText = activeDeviceCount[category];
}

document.getElementById('confirmButton').addEventListener('click', confirmRemoval);
document.getElementById('cancelButton').addEventListener('click', cancelRemoval);
